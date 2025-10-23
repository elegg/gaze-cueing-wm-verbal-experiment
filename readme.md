
## Image Creation
The 'image_creation' folder contains a script that places a mask over images sourced from the [Chicago Face Database](https://www.chicagofaces.org/) that covers peripheral features such as hair and ears and converts the images to a .webp format. 
We do not have the rights to distribute the source images but they can be accessed and downloaded using the link.

For the experiment the masked images were then manipulated using GIMP so that the iris and pupil were cropped out and positioned so the face looked to the left or right. 

Six faces were selected and saved in the following format "{letter}-{direction}.webp" with the letter a-f representing the identity of the face and the direction [center, left, right] representing the direction the eyes faced in. 
These images were then placed in the assets/faces folder of the experiment. 

## Experiment

The experiment is located in the wm-experiment folder. It is based on the jspych and jspsych-psychophysics modules.



