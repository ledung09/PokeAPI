interface Props {
  name: string;
  img_url: string;
  ability: string[];
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PokemonInfo = (props: Props) => {
  const { name, img_url, ability, setShowDetail} = props;
  return (
    <div className="poke--info">
      <div className="close--btn" onClick={() => {setShowDetail(false)}}>✕</div>
      <div className="poke--imag">
        <img src={img_url} alt="" />
      </div>
      <div className="poke--detail">
        <p> Name: {name} </p>
        <p> Ability: </p>
        <ul>
          {
            ability.map((abi, id) => {
              return <li key={id}>{abi}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}
