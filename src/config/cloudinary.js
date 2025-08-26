// Cloudinary Configuration
// Ganti dengan URL video Anda dari Cloudinary

export const CLOUDINARY_VIDEOS = {
  video1: "https://res.cloudinary.com/ds4ota3jr/video/upload/v1756214876/1_dby0nm.mov",
  video2: "https://res.cloudinary.com/ds4ota3jr/video/upload/v1756214882/2_en9wkr.mov", 
  video3: "https://res.cloudinary.com/ds4ota3jr/video/upload/v1756214877/3_xcfyej.mov",
  video4: "https://res.cloudinary.com/ds4ota3jr/video/upload/v1756214886/4_gddhlp.mov"
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
  photo7: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216943/7_p2obtc.jpg",
  photo8: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216933/8_odsu95.jpg",
  photo9: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216932/9_a0l1cx.jpg",
  photo10: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216933/10_iavypp.jpg",
  photo11: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216933/11_bxhazx.jpg",
  photo12: "https://res.cloudinary.com/ds4ota3jr/image/upload/v1756216933/12_akmrwu.jpg"
};

// Fungsi helper untuk optimasi video
export const getOptimizedVideoUrl = (videoName, options = {}) => {
  const baseUrl = CLOUDINARY_VIDEOS[videoName];
  if (!baseUrl) return null;
  
  const { quality = 'auto', format = 'auto', width = 'auto' } = options;
  return `${baseUrl}?f_${format},q_${quality},w_${width}`;
};

// Fungsi helper untuk optimasi gambar
export const getOptimizedImageUrl = (imageName, options = {}) => {
  const baseUrl = CLOUDINARY_IMAGES[imageName];
  if (!baseUrl) return null;
  
  const { 
    quality = 'auto', 
    format = 'auto', 
    width = 'auto',
    height = 'auto',
    crop = 'scale'
  } = options;
  
  return `${baseUrl}?f_${format},q_${quality},w_${width},h_${height},c_${crop}`;
};

// Contoh penggunaan:
// getOptimizedVideoUrl('video1', { quality: 'auto', format: 'webm' })
// getOptimizedImageUrl('photo1', { quality: 80, width: 800, format: 'webp' })
