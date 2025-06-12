import { usePlayerStore } from "@/store/playerStore"
import { useEffect, useState } from "react"
export const Pause = () => ( 
<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"
  ><path
    d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
  ></path></svg>
) 
export const Play = () => ( 
<svg viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor"
  ><path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path></svg>
)

const CurrentSong=({image,title,artists}) =>{
    return (
        <div
        className={`flex items-center gap-5 relative
        overflow-hidden`}>
        <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
            <img src={image} alt={title} />
        </picture>
        <div className="flex flex-col">
        <h3 className="font-semibold text-sm block">
            {title}

        </h3>
        <span className="text-xs opacity-80">
            {artists?.join(', ')}
            </span>
        </div>
        </div>
    )
}


export function Player(){
    const {currentMusic,isPlaying, setIsPlaying}=usePlayerStore(state=>state)
    const audioRef = useRef()
    useEffect(()=>{
        isPlaying
        ? audioRef.current.play()
        : audioRef.current.pause()
    },[isPlaying])

    useEffect(()=>{
        const{song,playlist,songs}=currentMusic
        if(song){
            const src=`/music/${playlist?.id}/0${song.id}.mp3`
            audioRef.current.src=src
            audioRef.current.play()
        }
    },[currentMusic])


    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }
    return(
        <div className="flex flex-row justify-between w-full px-4 z-50">
            <div>
                <CurrentSong {... currentMusic.song}/>
            </div>
            <div className="grid place-content-center gap-4 flex-1">
                <div className="flex justify-center">
                <button className="bg-white rounded-full p-2" onClick={handleClick}>
                {isPlaying ? <Pause />: <Play />}
                </button>
                </div>
            </div>
            <div className="grid place-content-center">
            Volumen
            </div>
            <audio ref={audioRef} />
        </div>
    )

}