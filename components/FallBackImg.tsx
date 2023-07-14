import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

const FallBackImg = (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & { src: string; fallBackSrc: string }) => {
  const {src, fallBackSrc, ...otherProps} = props
  return (
    <img
      src={src}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = fallBackSrc;
      }}
      {...otherProps}
    />
  );
};

export default FallBackImg;
