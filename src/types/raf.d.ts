declare module "raf" {
  const raf: (callback: FrameRequestCallback) => number;
  export default raf;
}
