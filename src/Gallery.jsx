import "./Gallery.css";

function putImageCard(etherNumber) {
  const image =
    "https://images.ether.site/avatar/" + etherNumber + ".webp?size=200x200";
  return (
    <div className="RosterItem">
      <img src={image} alt="" />
    </div>
  );
}

export default function Gallery() {
  const a = [
    1234, 456, 2342, 4564, 234, 23, 12, 4, 2, 14, 5, 6, 77, 546, 76, 99, 100,
    1234, 554, 2345, 2346,
  ];

  return (
    <div className="GalleryPage">
      <h1>Gallery</h1>
      <div className="GalleryWrapper">
        <div className="DisplayWrapper">asdasdasd</div>
        <div className="RosterWrapper">
          <div className="RosterImageWrapper">{a.map(putImageCard)}</div>
        </div>
      </div>
    </div>
  );
}
