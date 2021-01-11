export const WIDTH_LIST = [145,155,165,175,185,195,205,215,225,235,245];
export const HEIGHT_LIST = [35,40,45,50,55,60,65,70,75,80];
export const DIAMETER = [13,14,15,16,17,18,19,20];
export const formatImagePath = (imagePath) => {
    if (imagePath?.includes('public'))
        return imagePath.substring(16, imagePath.length);
    else
        return imagePath
};