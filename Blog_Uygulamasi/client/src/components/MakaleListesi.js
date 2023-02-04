import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

const MAKALELERI_GETIR = gql`
  query Query {
    makaleleriGetir {
      id
      icerik
      baslik
    }
  }
`;

export default function MakaleListesi() {
  const { data, loading, error } = useQuery(MAKALELERI_GETIR);

  let makaleTemp;
  if (loading) {
    makaleTemp = <p>Makaleler Yükleniyor..</p>;
  } else if (data) {
    makaleTemp = data.makaleleriGetir.map((makale) => {
      return (
        <div className="makaleler" key={makale.id}>
          <Link to={`/makale/${makale.id}`}>{makale.baslik}</Link>
        </div>
      );
    });
  }
  if (error) return <p>Error : {error.message}</p>;
  if (data) {
    console.log(data);
  }
  return <div>{makaleTemp}</div>;
}
