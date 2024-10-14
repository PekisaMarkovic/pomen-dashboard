interface QRcodeTableImageProps {
  url: string
  alt: string
  isShown: boolean
  handleIsShown: () => void
  handleIsHide: () => void
}

const QRcodeTableImage = ({ alt, url, handleIsHide, handleIsShown, isShown }: QRcodeTableImageProps) => {
  return (
    <div className="relative">
      <img src={url} className="h-8 w-8 cursor-pointer" alt={alt} onMouseEnter={handleIsShown} />

      {isShown && (
        <div className="absolute z-5 p-4 top-0 left-0 h-36 w-36 -translate-x-1/2 -translate-y-1/2 cursor-pointer" onMouseLeave={handleIsHide}>
          <img src={url} className="h-36 w-36 cursor-pointer" alt={alt} />
        </div>
      )}
    </div>
  )
}

export default QRcodeTableImage
