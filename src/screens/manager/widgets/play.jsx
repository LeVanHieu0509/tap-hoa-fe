import useAudioURL from "hooks/use-audio";

const Player = ({ url }) => {
  const [playing, toggle] = useAudioURL(url);

  return (
    <div style={{ color: "white" }}>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default Player;
