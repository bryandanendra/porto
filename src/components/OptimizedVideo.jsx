import React, { useRef, useEffect, useState, memo } from 'react';

/**
 * OptimizedVideo - Video yang hanya play ketika terlihat di viewport
 * Menggunakan IntersectionObserver untuk performa optimal
 */
const OptimizedVideo = memo(({
    src,
    className = '',
    style = {},
    ...props
}) => {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Intersection Observer untuk deteksi visibility
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            {
                threshold: 0.1,
                rootMargin: '100px' // Pre-load sedikit sebelum terlihat
            }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

    // Play/Pause berdasarkan visibility
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isVisible && isLoaded) {
            video.play().catch(() => {
                // Ignore autoplay errors
            });
        } else {
            video.pause();
        }
    }, [isVisible, isLoaded]);

    const handleLoadedData = () => {
        setIsLoaded(true);
    };

    return (
        <video
            ref={videoRef}
            className={className}
            style={{
                ...style,
                willChange: 'transform',
                transform: 'translateZ(0)', // Force GPU acceleration
            }}
            muted
            loop
            playsInline
            preload="none" // Tidak preload sampai terlihat
            onLoadedData={handleLoadedData}
            {...props}
        >
            {isVisible && <source src={src} type="video/mp4" />}
        </video>
    );
});

OptimizedVideo.displayName = 'OptimizedVideo';

export default OptimizedVideo;
