import ReactPlayer from 'react-player';

const Banner = () => {
    return (
        <div className="banner relative h-96">
        <ReactPlayer
          url="./video.mp4"
          playing
          loop
          muted
          width="100%"
          height="100%"
        />
        {/* Rest of your banner content */}
        <div className='absolute top-0 left-0 bg-slate-500 w-full h-full bg-opacity-70'>
            <h2 className='text-3xl font-bold text-red-500'>aminul islam</h2>
        </div>
      </div>
    );
};

export default Banner;