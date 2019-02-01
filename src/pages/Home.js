import React, { Component } from "react";
import firstImg from "../img/girl_training.jpg";
import secondImg from "../img/training.jpg";
export class Home extends Component {
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <h style={headerStyle}> Welcome to a healthier life</h>
        <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <img src={firstImg} width="100%" height="20%" />
        </div>

        <h style={headerStyle}>What is Trainer Dee?</h>
        <p style={paragraphStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          eu convallis eros, at posuere nunc. Quisque a interdum libero,
          placerat ultricies eros. Duis pharetra ligula ac dui facilisis
          pharetra. Donec eu interdum mauris. Interdum et malesuada fames ac
          ante ipsum primis in faucibus. Nulla ligula purus, facilisis lacinia
          ex et, vestibulum efficitur ex. Donec malesuada vel metus at feugiat.
          Sed et lorem vitae massa suscipit aliquam ac a orci. Fusce eget
          convallis orci, quis dictum velit. Nunc ante nisi, iaculis non sodales
          sed, fringilla a justo. Aenean pharetra, tortor at euismod euismod,
          quam odio ultricies odio, at mollis lectus felis eget leo.
          Pellentesque convallis sed felis ut pharetra. Morbi consectetur
          interdum tincidunt. Duis et vulputate massa. Duis dictum nibh ac
          tempor venenatis. Suspendisse convallis, enim et facilisis fermentum,
          ante diam lobortis elit, vel dictum eros purus ut quam. Fusce enim
          nunc, laoreet sit amet ex sed, facilisis venenatis est. Nunc gravida
          elit at ipsum semper, non laoreet velit mollis. Nunc accumsan accumsan
          urna, eu hendrerit lacus vestibulum sit amet. Vestibulum nunc lacus,
          molestie nec magna et, placerat sollicitudin enim.
        </p>

        <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <img src={secondImg} width="100%" />
        </div>
        <h style={headerStyle}>Why Trainer Dee?</h>
        <p style={paragraphStyle}>
          Proin eu faucibus sem. Duis gravida dolor felis, eget tincidunt mi
          porttitor ac. Cras in justo sollicitudin, cursus orci quis, interdum
          est. In magna est, iaculis in placerat sed, mattis vitae magna. Mauris
          auctor lorem et elit rhoncus hendrerit. Ut eget auctor dui.
          Pellentesque pharetra fringilla tortor, at porta diam lacinia id.
          Donec rhoncus ac ex quis condimentum. Aliquam ullamcorper lectus ac
          lacus tempus, non commodo velit sollicitudin. Mauris scelerisque
          consectetur viverra. Morbi rutrum ultricies nisi id vestibulum. Sed
          maximus, ante quis tristique viverra, nulla libero varius velit, sed
          bibendum ipsum nunc sed nunc. Sed in magna arcu. Duis felis massa,
          imperdiet ut blandit ac, tempor et sem. Praesent eget fermentum nisi,
          vitae eleifend sem. Cras non vehicula magna. Morbi euismod sit amet
          velit vitae rhoncus. Quisque id vehicula mi, quis sollicitudin sapien.
          Curabitur in lacus lacinia, viverra nulla et, ultricies ante. Cras
          faucibus sit amet sapien sed venenatis. Proin consectetur sagittis
          sollicitudin. Donec hendrerit dui in tincidunt molestie. Etiam rutrum
          ut nibh id pretium.
        </p>
      </div>
    );
  }
}

const headerStyle = {
  paddingLeft: "40px",
  paddingTop: "20px",
  textAlign: "left",
  fontSize: "35px",
  fontWeight: "bold"
};

const paragraphStyle = {
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingTop: "10px",
  textAlign: "left",
  fontSize: "25px"
};

export default Home;
