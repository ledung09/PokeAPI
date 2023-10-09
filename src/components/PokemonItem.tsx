interface Props {
  key: number;
  name: string;
  img_src: string;
  onClick: () => void;
}

export const PokemonItem = (props: Props) => {
  const {name, img_src, onClick} = props;
  return (
    <div className="poke--item" onClick={onClick}>
      <p className="poke--name">{name}</p>
      <img className="poke--img" src={img_src} alt="" />
    </div>
  )
}
