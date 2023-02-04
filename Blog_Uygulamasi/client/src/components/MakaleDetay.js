import React from "react";
import { useParams } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const MAKALE_GETIR = gql`
  query Query($makaleGetirId: ID!) {
    makaleGetir(id: $makaleGetirId) {
      baslik
      icerik
      id
    }
  }
`;
const MAKALE_SIL = gql`
  mutation MakaleSil($makaleSilId: ID!) {
    makaleSil(id: $makaleSilId)
  }
`;

export default function MakaleDetay() {
  const { id } = useParams();
  console.log(id);

  const { data } = useQuery(MAKALE_GETIR, {
    variables: {
      makaleGetirId: id,
    },
  });

  const [makaleSil] = useMutation(MAKALE_SIL);

  return (
    <div>
      {data && (
        <div className="detay content">
          <h2>{data.makaleGetir.baslik}</h2>
          <div className="content">{data.makaleGetir.icerik}</div>
          <a
            href
            className="sil"
            onClick={(e) => {
              e.preventDefault();
              makaleSil({
                variables: { makaleSilId: id },
              }).then(() => {
                window.location.assign("/");
              });
            }}
          >
            Sil
          </a>
        </div>
      )}
    </div>
  );
}
