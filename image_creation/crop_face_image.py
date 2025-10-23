import cv2 as cv
import glob

FACE_FILE_FOLDER_SEARCH = "/Volumes/Untitled/gregory-vino/**.jpg"
MASK_FILE = "mask2.png"
OUTPUT_FOLDER = "/Volumes/Untitled/gregory-vino/stimuli"


files = glob.glob(FACE_FILE_FOLDER_SEARCH)

mask = cv.imread(MASK_FILE)

def writeImage(id, image):
    img = cv.imread(image)
    x_start, y_start, x_end, y_end = 650, 200, 1800, 1400  
    
    mask_x_start, mask_y_start, mask_x_end, mask_y_end = 156, 96, 1000-156,1000-26
    # Crop the image using slicing
    cropped_img = img[y_start:y_end, x_start:x_end]

    resized_image = cv.resize(cropped_img, (1000, 1000), dst=None, fx=None, fy=None, interpolation=cv.INTER_LINEAR)
    alpha = 0.5
    beta = (1.0)
    dst = cv.addWeighted(resized_image, alpha, mask, beta, 0.0)
   

    cv.imwrite(f"{OUTPUT_FOLDER}/gaze-{id}.webp", dst[mask_y_start:mask_y_end, mask_x_start:mask_x_end])
  




for i , file in enumerate(files):
    
   writeImage(i, file)


