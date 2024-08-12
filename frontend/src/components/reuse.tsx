import Skeleton from "@mui/material/Skeleton"
const SongListLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(7)].map((val, key) => {
        return (
          <div key={key}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={60}
              animation="wave"
            />
          </div>
        )
      })}
    </div>
  )
}

export { SongListLoadingSkeleton }
