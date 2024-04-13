import imagenPaute from "./../images/pauteaqui.jpg";

const GoogleADS = () => {
  return (
    <>
      <div
        style={{
          width: "50%",
          height: "300px",
          margin: "0 auto",
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src={imagenPaute}
          alt=""
        />
      </div>
      <ins
        class="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2780749763957723"
        data-ad-slot="2587403147"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default GoogleADS;
