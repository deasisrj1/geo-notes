export default function ImageCropperComponent({
  image,
  setImage,
  setOpenImgCrop,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-8">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setOpenImgCrop(false)}
        >
          <span className="text-2xl font-bold">&times;</span>
        </button>

        <img
          className=" w-full h-full rounded border-2 border-neutral-700"
          src={image}
          // style={{ aspectRatio: "4/3" }}
        />
      </div>
    </div>
  );
}
