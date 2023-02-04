import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const MAKALE_EKLE = gql`
  mutation MakaleOlustur($baslik: String!, $icerik: String!) {
    makaleOlustur(baslik: $baslik, icerik: $icerik) {
      baslik
      icerik
      id
    }
  }
`;
export default function MakaleEkle() {
  const [veriler, setVeriler] = useState({
    baslik: "",
    icerik: "",
  });
  const [makaleEkle] = useMutation(MAKALE_EKLE, {
    update(proxy, sonuc) {
      console.log(sonuc);
    },
    variables: veriler,
  });
  const onChange = (e) => {
    setVeriler({ ...veriler, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    makaleEkle();
    window.location = "/";
  };
  return (
    <div className="makale-olustur">
      <form onSubmit={onSubmit}>
        <label htmlFor="baslik">Makale Başlık:</label>
        <input
          type="text"
          id="baslik"
          name="baslik"
          onChange={onChange}
        ></input>
        <label htmlFor="icerik">Makale İçerik:</label>
        <textarea
          type="text"
          id="icerik"
          name="icerik"
          onChange={onChange}
        ></textarea>

        <button>Kaydet</button>
      </form>
    </div>
  );
}
