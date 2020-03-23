import createDynamicStylesheet from '../../utils/create-dynamic-stylesheet';

export default function injectExceptionStyle(name) {
  const stylesheet = createDynamicStylesheet('hide-avatars');

  stylesheet.insertStyle(
    [`img[alt="${name}"]`, `img[alt="@${name}"]`],
    `content: none !important;`
  );

  return stylesheet;
}
