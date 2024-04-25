import axios from 'axios';

const baseURL = 'https://api.lemonsqueezy.com/v1';
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiI2YzgzZDlhYjgxMjc1YTM0OGIyMmRiYmRhMmZlODEyZjljZTEwNzQ4ZTFmY2ViMmI3MTdlYmMyMDc5MzY0YWUxNDFjOGRiOTZhOTA3MjNhNCIsImlhdCI6MTcxMjUyMjEwOS4wNjQ2NzIsIm5iZiI6MTcxMjUyMjEwOS4wNjQ2NzUsImV4cCI6MjAyODA1NDkwOS4wMzU0LCJzdWIiOiIyMjM3OTk2Iiwic2NvcGVzIjpbXX0.ea4ZSH-mqP5UppcfEiUBLyyrORoH9MuqD5_IASKq-W-0MuPCdaNnaDo83OlJbMpO4-zfjykX36M7DN6i5Aioc8jRjwFU1QVzIe8YMjR5so21BHB9Pt5ItgkSwDoXXvLUdUdAoW-Xxff_rJ4jae1Wm1WFUm4UbWQ5NOZrrukPhQ473q3ysaz36O4c04XoJrrsOI5oSYSM-tFpdqAPpwEWYP6PMwVea6ere3O0YNSz1YG0U0Ppmg3JvT3QhGCMvgcHe8pwv4OCXfVdL0Du-73YIVQ779mH5F1mA-iDSe8s86aPv0OlewLDxyXnY9zMsYi3WllqxA2qvmpwfaAv6mYZAPHfmLJTaBXDy9sDI1L4AvH2732CS9m-08XHr9t7S3PZpu-Ik1x0MlMmkzGdp96CfQtxFbKpX9FBBFZPSgVwZMlbuoUi6WVj5EGVaB2SxrztWE7zEQ6stS6MqwR3jw97ew6D0Jx35y7bjvvNPP5cLnb_eZ_wiSCOMoiz4HHlsXii';

const lemonSqueezyAxiosInstance = axios.create({
  baseURL,
});

lemonSqueezyAxiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default lemonSqueezyAxiosInstance;
