import { Dimensions, Image, Pressable, View } from "react-native";
import { Fragment, useEffect, useRef, useState } from "react";
import styles from "./style";

import Carousel from "react-native-reanimated-carousel";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";

const PAGE_WIDTH = Dimensions.get("window").width;

const Carrossel = ({ imagens, selecionarImagem }) => {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    return () => setIndex(0);
  }, [imagens]);

  return (
    <View style={styles.container}>
      {imagens && (
        <Fragment>
          <Carousel
            defaultIndex={index}
            ref={ref}
            loop
            width={PAGE_WIDTH}
            scrollAnimationDuration={100}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            onSnapToItem={(idx) => setIndex(idx)}
            data={imagens}
            renderItem={({ item, index }) => (
              <Pressable style={styles.wrapperImagem} onPress={() => selecionarImagem(item)}>
                <Image source={{ uri: item.url }} style={styles.imagem} resizeMode="contain" />
              </Pressable>
            )}
          />

          <View style={styles.pontos}>
            <AnimatedDotsCarousel
              length={imagens.length}
              currentIndex={index}
              maxIndicators={1}
              interpolateOpacityAndColor={true}
              activeIndicatorConfig={{
                color: "black",
                margin: 3,
                opacity: 1,
                size: 8,
              }}
              inactiveIndicatorConfig={{
                color: "#a9a9a9",
                margin: 3,
                opacity: 0.5,
                size: 8,
              }}
              decreasingDots={[
                {
                  config: { color: "#a9a9a9", margin: 3, opacity: 0.5, size: 6 },
                  quantity: 1,
                },
                {
                  config: { color: "#a9a9a9", margin: 3, opacity: 0.5, size: 4 },
                  quantity: 1,
                },
              ]}
            />
          </View>
        </Fragment>
      )}
    </View>
  );
};

export default Carrossel;
