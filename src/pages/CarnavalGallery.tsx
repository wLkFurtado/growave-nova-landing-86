import { useState, useEffect, useCallback } from 'react';
import { Download, X, ChevronLeft, ChevronRight, Camera, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const TAG = 'carnaval-2026';
const PHOTOS_PER_PAGE = 30;

interface CloudinaryResource {
  public_id: string;
  version: number;
  format: string;
  width: number;
  height: number;
  type: string;
  created_at: string;
}

interface CloudinaryListResponse {
  resources: CloudinaryResource[];
  next_cursor?: string;
}

/** Build a Cloudinary URL with transformations */
const cloudinaryUrl = (publicId: string, format: string, transforms = '') => {
  const t = transforms ? `${transforms}/` : '';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t}${publicId}.${format}`;
};

/** Thumbnail: 400px wide, auto quality, auto format */
const thumbnailUrl = (r: CloudinaryResource) =>
  cloudinaryUrl(r.public_id, r.format, 'c_fill,w_400,q_auto,f_auto');

/** Medium: lightbox view, max 1600px */
const lightboxUrl = (r: CloudinaryResource) =>
  cloudinaryUrl(r.public_id, r.format, 'c_limit,w_1600,q_auto,f_auto');

/** Original: full quality for download */
const originalUrl = (r: CloudinaryResource) =>
  cloudinaryUrl(r.public_id, r.format);

const CarnavalGallery = () => {
  const [allPhotos, setAllPhotos] = useState<CloudinaryResource[]>([]);
  const [visibleCount, setVisibleCount] = useState(PHOTOS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Fetch all photos from Cloudinary tag listing
  useEffect(() => {
    const fetchPhotos = async () => {
      if (!CLOUD_NAME || CLOUD_NAME === 'SEU_CLOUD_NAME_AQUI') {
        setError('Configure VITE_CLOUDINARY_CLOUD_NAME no arquivo .env');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${TAG}.json`
        );
        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? `Nenhuma foto encontrada com a tag "${TAG}". Verifique se as fotos foram tagueadas no Cloudinary.`
              : `Erro ao carregar fotos (${res.status})`
          );
        }
        const data: CloudinaryListResponse = await res.json();
        setAllPhotos(data.resources || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar fotos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const visiblePhotos = allPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < allPhotos.length;

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  };

  const goNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % allPhotos.length);
    }
  }, [selectedIndex, allPhotos.length]);

  const goPrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + allPhotos.length) % allPhotos.length);
    }
  }, [selectedIndex, allPhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, goNext, goPrev]);

  const handleDownload = async (photo: CloudinaryResource, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const url = originalUrl(photo);
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `carnaval_${photo.public_id.split('/').pop() || photo.public_id}.${photo.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(originalUrl(photo), '_blank');
    }
  };

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + PHOTOS_PER_PAGE, allPhotos.length));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Decorative gradient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-growave-green/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-growave-green/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-growave-blue/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-5">
            <a href="/" className="flex items-center gap-3 group">
              <ArrowLeft className="h-4 w-4 text-white/40 group-hover:text-growave-green transition-colors" />
              <img
                src="/lovable-uploads/dc7d5c5c-2c27-4986-9008-acd55a89fc67.png"
                alt="Growave Logo"
                className="h-7 sm:h-9 object-scale-down"
              />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-growave-green/20 bg-growave-green/5 mb-6 animate-fade-in">
            <Camera className="h-4 w-4 text-growave-green" />
            <span className="text-sm text-growave-green font-medium tracking-wide">GALERIA DE FOTOS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 animate-fade-in">
            FOTOS{' '}
            <span className="bg-gradient-to-r from-growave-green via-growave-green-light to-growave-green bg-clip-text text-transparent">
              BLOCO DELAS
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.15s' }}>
            Confira os melhores momentos do bloco delas! Clique nas fotos para ampliar e baixe suas favoritas.
          </p>
          {!loading && !error && (
            <div className="flex items-center justify-center gap-4 text-sm text-white/30 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <span>{allPhotos.length} {allPhotos.length === 1 ? 'foto' : 'fotos'}</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>Clique para ampliar</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>Download gratuito</span>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="relative z-10 pb-20 sm:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading state */}
          {loading && (
            <div className="text-center py-32">
              <Loader2 className="h-10 w-10 text-growave-green mx-auto mb-4 animate-spin" />
              <p className="text-white/40">Carregando fotos...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-32">
              <Camera className="h-16 w-16 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 text-lg mb-2">Ops!</p>
              <p className="text-white/25 text-sm max-w-md mx-auto">{error}</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && allPhotos.length === 0 && (
            <div className="text-center py-32">
              <Camera className="h-16 w-16 text-white/10 mx-auto mb-4" />
              <p className="text-white/30 text-lg">Nenhuma foto adicionada ainda.</p>
              <p className="text-white/20 text-sm mt-2">
                Faça upload no Cloudinary com a tag <code className="bg-white/5 px-2 py-1 rounded">{TAG}</code>
              </p>
            </div>
          )}

          {/* Photos grid */}
          {!loading && !error && visiblePhotos.length > 0 && (
            <>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {visiblePhotos.map((photo, index) => (
                  <div
                    key={photo.public_id}
                    className="break-inside-avoid group relative cursor-pointer rounded-xl overflow-hidden bg-white/5 animate-fade-in"
                    style={{ animationDelay: `${(index % PHOTOS_PER_PAGE) * 0.05}s` }}
                    onClick={() => openLightbox(index)}
                  >
                    {/* Skeleton loader */}
                    {!loadedImages.has(index) && (
                      <div className="absolute inset-0 bg-white/5 animate-pulse" style={{ aspectRatio: `${photo.width}/${photo.height}` }} />
                    )}

                    <img
                      src={thumbnailUrl(photo)}
                      alt={`Carnaval - Foto ${index + 1}`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(index)}
                      className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${
                        loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                      <div className="w-full p-4 flex items-center justify-between">
                        <span className="text-sm text-white/70 truncate mr-3">
                          Foto {index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white/80 hover:text-growave-green hover:bg-growave-green/10 shrink-0 transition-colors"
                          onClick={(e) => handleDownload(photo, e)}
                        >
                          <Download className="h-4 w-4 mr-1.5" />
                          Baixar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load more */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={loadMore}
                    className="border-growave-green/30 text-growave-green hover:bg-growave-green/10 hover:border-growave-green/50 px-8"
                  >
                    Carregar mais fotos
                    <span className="ml-2 text-white/30 text-sm">
                      ({visibleCount} de {allPhotos.length})
                    </span>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} Growave — Todos os direitos reservados
          </p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {selectedIndex !== null && allPhotos[selectedIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Download button */}
          <button
            className="absolute top-4 right-16 z-10 p-2 rounded-full bg-white/5 hover:bg-growave-green/10 text-white/60 hover:text-growave-green transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(allPhotos[selectedIndex]);
            }}
          >
            <Download className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-4 z-10 text-white/40 text-sm font-medium">
            {selectedIndex + 1} / {allPhotos.length}
          </div>

          {/* Navigation arrows */}
          {allPhotos.length > 1 && (
            <>
              <button
                className="absolute left-2 sm:left-6 z-10 p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
              <button
                className="absolute right-2 sm:right-6 z-10 p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
            </>
          )}

          {/* Image (higher quality for lightbox) */}
          <div
            className="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxUrl(allPhotos[selectedIndex])}
              alt={`Carnaval - Foto ${selectedIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl shadow-black/50"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarnavalGallery;
