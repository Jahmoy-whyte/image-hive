import { faker } from "@faker-js/faker";
import { View, TouchableOpacity, Text } from "react-native";
import { fakerEN, fakerZH_TW } from "@faker-js/faker";

fakerZH_TW.seed(5);
fakerEN.seed(5);

export const TestScreen1 = () => {
  const fakerTest = () => {
    const randomName = faker.person.fullName(); // Rowan Nikolaus
    const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    const avatar = faker.image.urlPicsumPhotos();

    const firstName = fakerZH_TW.person.firstName(); // 炫明
    const alias = fakerEN.person.firstName(); // Arthur

    console.log(firstName);
  };

  return (
    <View style={{ marginVertical: 50 }}>
      <TouchableOpacity onPress={() => fakerTest()}>
        <Text>Text me</Text>
      </TouchableOpacity>
    </View>
  );
};

[
  { category: "Landscape" },
  { category: "Cars" },
  { category: "3D Renders" },
  { category: "Food" },
  { category: "Fashion & Beauty" },
];
