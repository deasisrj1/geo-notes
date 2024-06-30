// const handleNoteClick = (id) => {
//   console.log(id);
//   const map = mapRef.current;
//   if (!map) {
//     return;
//   }
//   const marker = markersRef.current[`${id}`];
//   map.target.flyTo(marker._latlng), 13;
//   if (marker) {
//     marker.openPopup();
//   }
//   // return <Link href={`/conversation/${id}`}>Dashboard</Link>
// };
export default function Page({ params }) {
    return <div>My Post: {params.id}</div>
  }