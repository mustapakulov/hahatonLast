import React from "react";
import Carousel from "react-material-ui-carousel";
import autoBind from "auto-bind";
import "../Karuselnav/KaruselNavigate.css";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@material-ui/core";

function Banner(props) {
  if (props.newProp) console.log(props.newProp);
  const contentPosition = props.contentPosition
    ? props.contentPosition
    : "left";
  const totalItems = props.length ? props.length : 2;
  const mediaLength = totalItems - 1;

  let items = [];
  const content = (
    <Grid item xs={12 / totalItems} key="content">
      <CardContent className="Content">
        <Typography className="Title">{props.item.Name}</Typography>

        <Typography className="Caption">{props.item.Caption}</Typography>
      </CardContent>
    </Grid>
  );

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];

    const media = (
      <Grid item xs={12 / totalItems} key={item.Name}>
        <CardMedia className="Media" image={item.Image} title={item.Name}>
          <Typography className="MediaCaption">{item.Name}</Typography>
        </CardMedia>
      </Grid>
    );

    items.push(media);
  }

  if (contentPosition === "left") {
    items.unshift(content);
  } else if (contentPosition === "right") {
    items.push(content);
  } else if (contentPosition === "middle") {
    items.splice(items.length / 1, 0, content);
  }

  return (
    <Card raised className="Banner">
      <Grid container spacing={0} className="BannerGrid">
        {items}
      </Grid>
    </Card>
  );
}

const items = [
  {
    Name: "Tesla S",
    Caption: "Революционный электромобиль, призванный полностью уничтожить двигатель внутреннего сгорания и привить человечеству желание передвигаться исключительно на экологически чистом транспорте.",
    Image:
      "https://yandex.ru/images/search?pos=2&img_url=https%3A%2F%2Fimg3.goodfon.com%2Foriginal%2F5416x3611%2Fc%2Fdc%2Fparizh-franciya-noch-ogni-2465.jpg&text=paris&rpt=simage",
    contentPosition: "left",
    Items: [
      {
        Image:
          "https://hsto.org/getpro/habr/post_images/672/042/1ac/6720421acca7ce1cef1cdee2dd3ca9a7.jpg",
      },
    ],
  },
  {
    Name: "Tesla 3",
    Caption:
      "Построен на новой платформе, которая в корне отличается от Model S и Model X. Призван стать первым массовым электромобилем от Tesla Inc.",
    contentPosition: "middle",
    Items: [
      {
        Image:
          "https://autopeople.ru/news/wp-content/uploads/Tesla-Model-3-with-rocks_1500x996.jpg",
      },
    ],
  },
  {
    Name: "Tesla X",
    Caption: "Лучший кроссовер. Полностью электрический, двери типа «крылья сокола», полный привод, до 7 мест, панорамное лобовое стекло!",
    contentPosition: "right",
    Items: [
      {
        Image:
          "https://avatars.mds.yandex.net/i?id=2a0000017a0f7ee895bf3caee3a911e86bed-5177977-images-thumbs&n=13",
      },
     
    ],
  },
];

class KaruselNavigate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      animation: "fade",
      indicators: true,
      timeout: 500,
      navButtonsAlwaysVisible: false,
      navButtonsAlwaysInvisible: false,
      cycleNavigation: true,
    };

    autoBind(this);
  }

  toggleAutoPlay() {
    this.setState({
      autoPlay: !this.state.autoPlay,
    });
  }

  toggleIndicators() {
    this.setState({
      indicators: !this.state.indicators,
    });
  }

  toggleNavButtonsAlwaysVisible() {
    this.setState({
      navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible,
    });
  }

  toggleNavButtonsAlwaysInvisible() {
    this.setState({
      navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible,
    });
  }

  toggleCycleNavigation() {
    this.setState({
      cycleNavigation: !this.state.cycleNavigation,
    });
  }

  changeAnimation(event) {
    this.setState({
      animation: event.target.value,
    });
  }

  changeTimeout(event, value) {
    this.setState({
      timeout: value,
    });
  }

  render() {
    return (
      <div style={{ marginTop: "50px", color: "#494949" }}>
        <Carousel
          className="Example"
          autoPlay={this.state.autoPlay}
          animation={this.state.animation}
          indicators={this.state.indicators}
          timeout={this.state.timeout}
          cycleNavigation={this.state.cycleNavigation}
          navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
          navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
          // next={(now, previous) =>
          //   console.log(
          //     `Next User Callback: Now displaying child${now}. Previously displayed child${previous}`
          //   )
          // }
          // prev={(now, previous) =>
          //   console.log(
          //     `Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`
          //   )
          // }
          // onChange={(now, previous) =>
          //   console.log(
          //     `OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`
          //   )
          // }
          // fullHeightHover={false}
          // navButtonsProps={{style: {backgroundColor: 'cornflowerblue', borderRadius: 0}}}
          // navButtonsWrapperProps={{style: {bottom: '0', top: 'unset', }}}
          // indicatorContainerProps={{style: {margin: "20px"}}}
          // NextIcon='next'
        >
          {items.map((item, index) => {
            return (
              <Banner
                item={item}
                key={index}
                contentPosition={item.contentPosition}
              />
            );
          })}
        </Carousel>
      </div>
    );
  }
}

export default KaruselNavigate;
