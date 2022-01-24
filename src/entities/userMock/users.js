import { User } from "../../models/user/User";

const Murad = new User({name: 'Мурад', surname: 'Сарафанов', avatar: require('@assets/murad.png')});
const Patricia = new User({name: 'Патрисия', surname: 'Стёклышкова', avatar: require('@assets/patricia.png')});
const Cezar = new User({name: 'Юлий', surname: 'Цезарь', avatar: require('@assets/murad.png')});

export const usersMock = [Murad, Patricia, Cezar];
