type Props = {
  src: string
  alt: string
  className?: string
  title?: string
  priority?: boolean
  caption?: string
}

export function DesktopFrame({
  src,
  alt,
  className = '',
  title = 'GetBox',
  priority = false,
  caption,
}: Props) {
  return (
    <figure className={`desktop-frame ${className}`}>
      <div className="desktop-frame__chrome" aria-hidden="true">
        <span className="desktop-frame__title">{title}</span>
        <div className="desktop-frame__win">
          <span className="desktop-frame__win-btn" />
          <span className="desktop-frame__win-btn desktop-frame__win-btn--max" />
          <span className="desktop-frame__win-btn desktop-frame__win-btn--close" />
        </div>
      </div>
      <div className="desktop-frame__screen">
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </div>
      {caption ? <figcaption className="desktop-frame__cap">{caption}</figcaption> : null}
    </figure>
  )
}
