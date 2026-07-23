export default function VideoComponent() {
  return (
    <div className="w-full px-6 md:px-16 my-10">
      <div className="w-full h-[60vh] md:h-[85vh] rounded-3xl overflow-hidden shadow-2xl relative bg-zinc-900">
        <video
          src="/Videos/MainVideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}