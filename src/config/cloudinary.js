// Cloudinary Configuration
// Ganti dengan URL video Anda dari Cloudinary

export const CLOUDINARY_VIDEOS = {
  video1: "https://res.cloudinary.com/ds4ota3jr/video/upload/v1756214876/1_dby0nm.mov",
  video2: "https://res.cloudinary.com/ds4ota3jr/video/upload/v1756214882/2_en9wkr.mov",
  video3: "https://res.cloudinary.com/ds4ota3jr/video/upload/v1756214877/3_xcfyej.mov",
  video4: "https://res.cloudinary.com/ds4ota3jr/video/upload/v1756214886/4_gddhlp.mov",
  video5: "https://res.cloudinary.com/ds4ota3jr/video/upload/v1766898520/porto_ucmlqm.mov",
  video6: "https://res.cloudinary.com/ds4ota3jr/video/upload/v1766899071/porto_lagi_akoxwf.mov"
};

// Konfigurasi gambar untuk halaman About
export const CLOUDINARY_IMAGES = {
  // Ganti dengan URL gambar Anda dari Cloudinary
  photo1: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216931/1_he4wap.jpg",
  photo2: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216931/2_qaztc0.jpg",
  photo3: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216931/3_tadc0u.jpg",
  photo4: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216931/4_m2fjsw.jpg",
  photo5: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216933/5_cpfxkd.jpg",
  photo6: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216932/6_wff8sw.jpg",
  photo8: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216933/8_odsu95.jpg",
  photo9: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216932/9_a0l1cx.jpg",
  photo10: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216933/10_iavypp.jpg",
  photo11: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216933/11_bxhazx.jpg",
  photo12: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216933/12_akmrwu.jpg"
};

// Fungsi helper untuk optimasi video - Cloudinary URL transformation
export const getOptimizedVideoUrl = (videoKey, options = {}) => {
  const baseUrl = CLOUDINARY_VIDEOS[videoKey];
  if (!baseUrl) return baseUrl;

  const { quality = 'auto', format = 'mp4', width } = options;

  // Insert transformations into Cloudinary URL path
  // Format: .../upload/TRANSFORMATIONS/...
  const transformations = [];
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);
  if (width && width !== 'auto') transformations.push(`w_${width}`);
  transformations.push('vc_auto'); // Auto video codec

  const transformString = transformations.join(',');
  return baseUrl.replace('/upload/', `/upload/${transformString}/`);
};

// Fungsi helper untuk optimasi gambar - Cloudinary URL transformation  
export const getOptimizedImageUrl = (imageKey, options = {}) => {
  const baseUrl = CLOUDINARY_IMAGES[imageKey];
  if (!baseUrl) return baseUrl;

  const {
    quality = 'auto',
    format = 'webp',
    width,
    height,
    crop = 'scale'
  } = options;

  // Insert transformations into Cloudinary URL path
  const transformations = [];
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);
  if (width && width !== 'auto') transformations.push(`w_${width}`);
  if (height && height !== 'auto') transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);

  const transformString = transformations.join(',');
  return baseUrl.replace('/upload/', `/upload/${transformString}/`);
};

// Pre-optimized URLs untuk langsung dipakai
export const OPTIMIZED_VIDEOS = {
  video1: getOptimizedVideoUrl('video1', { quality: 'auto', format: 'mp4', width: 480 }),
  video2: getOptimizedVideoUrl('video2', { quality: 'auto', format: 'mp4', width: 480 }),
  video3: getOptimizedVideoUrl('video3', { quality: 'auto', format: 'mp4', width: 480 }),
  video4: getOptimizedVideoUrl('video4', { quality: 'auto', format: 'mp4', width: 480 }),
  video5: getOptimizedVideoUrl('video5', { quality: 'auto', format: 'mp4', width: 480 }),
  video6: getOptimizedVideoUrl('video6', { quality: 'auto', format: 'mp4', width: 480 }),
};

export const OPTIMIZED_IMAGES = {
  photo1: getOptimizedImageUrl('photo1', { quality: 'auto', format: 'webp', width: 600 }),
  photo2: getOptimizedImageUrl('photo2', { quality: 'auto', format: 'webp', width: 600 }),
  photo3: getOptimizedImageUrl('photo3', { quality: 'auto', format: 'webp', width: 600 }),
  photo4: getOptimizedImageUrl('photo4', { quality: 'auto', format: 'webp', width: 600 }),
  photo5: getOptimizedImageUrl('photo5', { quality: 'auto', format: 'webp', width: 600 }),
  photo6: getOptimizedImageUrl('photo6', { quality: 'auto', format: 'webp', width: 600 }),

  photo8: getOptimizedImageUrl('photo8', { quality: 'auto', format: 'webp', width: 600 }),
  photo9: getOptimizedImageUrl('photo9', { quality: 'auto', format: 'webp', width: 600 }),
  photo10: getOptimizedImageUrl('photo10', { quality: 'auto', format: 'webp', width: 600 }),
  photo11: getOptimizedImageUrl('photo11', { quality: 'auto', format: 'webp', width: 600 }),
  photo12: getOptimizedImageUrl('photo12', { quality: 'auto', format: 'webp', width: 600 }),
};
