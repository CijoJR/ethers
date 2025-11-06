import "./Masonry.css";

export default function Masonry() {
  return (
    <div className="HMasonry">
      {/* SVG filter definition */}
      <svg style={{ display: "none", position: 'absolute' }}>
        <filter id="fisheye">
          <feImage 
            result="warpMap"
            preserveAspectRatio="none"
            xlinkHref={`data:image/svg+xml;utf8,
              <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
                <radialGradient id='grad' cx='50%' cy='50%' r='50%'>
                  <stop offset='0%' stop-color='rgb(255,128,128)'/>
                  <stop offset='200%' stop-color='rgb(128,128,128)'/>
                </radialGradient>
                <rect width='100%' height='100%' fill='url(%23grad)'/>
              </svg>`}
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warpMap"
            scale="500"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Grid content */}
      {/* <div className="masonry fisheye">
        <div className="masonry-item">Card 1</div>
        <div className="masonry-item">
          Card 2<br />taller
        </div>
        <div className="masonry-item">Card 3</div>
        <div className="masonry-item">
          Card 4<br />with<br />many<br />lines
        </div>
        <div className="masonry-item">Card 5</div>
        <div className="masonry-item">
          Card 6<br />glitchy
        </div>
      </div> */}
    </div>
  );
}