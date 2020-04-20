import { isUrl } from '@/utils/util';

const menuData = [
  {
    name: "音乐馆",
    path: "music-hall",
    children: [
      {
        name: "个人推荐",
        path: "recommend",
      },
      {
        name: "排行榜",
        path: "rank",
      },
    ],
  },
];

/**
 * 
 * @param {Array<Object>} menu 
 * @param {String} parentPath 
 * @param {*} parentAuthority 
 */
const formatter = (menu, parentPath = "/", parentAuthority) => {
  return menu.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
};

export const getMenuData = () => formatter(menuData);
