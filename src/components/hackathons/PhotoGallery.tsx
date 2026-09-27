'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ImageRef } from '@/content/schema';
import { cn } from '@/lib/cn';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface PhotoGalleryProps {
  photos: ImageRef[];
  heading?: string;
  className?: string;
}

export function PhotoGallery({ photos, heading, className }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isOpen = selectedIndex !== null;

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    // Dialog showModal will be called in useEffect
  };

  const closeLightbox = useCallback(() => {
    if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
    const lastIndex = selectedIndex;
    setSelectedIndex(null);
    if (lastIndex !== null && triggerRefs.current[lastIndex]) {
      triggerRefs.current[lastIndex]?.focus();
    }
  }, [selectedIndex]);

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev! + 1) % photos.length));
  }, [photos.length, selectedIndex]);

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + photos.length) % photos.length);
  }, [photos.length, selectedIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showNext, showPrev, closeLightbox]);

  if (!photos || photos.length === 0) {
    return null;
  }

  const currentPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <div className={cn('space-y-6', className)}>
      {heading && (
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-mono uppercase tracking-widest text-ink font-semibold">
            {heading}
          </h4>
          <span className="text-xs font-mono text-ink-2">
            {photos.length} photos
          </span>
        </div>
      )}

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {photos.map((photo, idx) => (
          <button
            key={photo.src}
            ref={(el) => {
              triggerRefs.current[idx] = el;
            }}
            type="button"
            onClick={() => openLightbox(idx)}
            aria-label={`View photo ${idx + 1} of ${photos.length}: ${photo.alt}`}
            className="group relative aspect-[4/3] w-full rounded-[2px] overflow-hidden border border-line bg-surface/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent hover:border-mark transition-all"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-[2px] bg-black/75 text-[10px] font-mono text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
              {idx + 1}/{photos.length}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        onCancel={(e) => {
          e.preventDefault();
          closeLightbox();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            closeLightbox();
          }
        }}
        aria-label="Hackathon photo lightbox"
        className="backdrop:bg-black/90 backdrop:backdrop-blur-sm p-0 bg-transparent text-ink max-w-[95vw] md:max-w-4xl w-full m-auto rounded-[2px] outline-none shadow-2xl open:flex open:flex-col"
      >
        {currentPhoto && (
          <div className="relative bg-bg border border-line rounded-[2px] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header / Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-surface/60">
              <span className="text-xs font-mono font-medium text-ink">
                Photo {selectedIndex! + 1} of {photos.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="p-1.5 rounded-[2px] text-ink hover:bg-surface border border-line/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Main Image Area with Previous / Next Controls */}
            <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] max-h-[70vh] bg-black/95 flex items-center justify-center p-2 sm:p-4">
              <div className="relative w-full h-full min-h-[300px] sm:min-h-[460px]">
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 95vw, 1000px"
                  className="object-contain"
                />
              </div>

              {/* Navigation arrows */}
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-[2px] bg-black/60 hover:bg-black/85 text-white border border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-[2px] bg-black/60 hover:bg-black/85 text-white border border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Caption bar */}
            <div className="px-4 py-3 border-t border-line bg-surface/60">
              <p className="text-xs sm:text-sm text-ink-2 font-mono text-center">
                {currentPhoto.alt}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
