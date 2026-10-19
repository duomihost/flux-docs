import {PLATFORM_LABELS, parseVersionTags} from './lib/entries.mjs';

// 只改网页渲染树，保持构造器写入格式和客户端 JSON/HTML 清单的原有语义。
export default function changelogVersionBadges() {
  return (tree, file) => {
    if (!/\/changelog\/index\.md$/.test(String(file.path ?? '').replaceAll('\\', '/'))) return;
    for (const node of tree.children) {
      if (node.type !== 'paragraph' || node.children.some(child => child.type !== 'text')) continue;
      const text = node.children.map(child => child.value).join('');
      if (!/^(版本[：:]|Version:)/i.test(text)) continue;
      const {versions, betas} = parseVersionTags([text]);
      if (!Object.keys(versions).length) continue;
      node.children = [{type: 'text', value: text.startsWith('Version:') ? 'Version: ' : '版本：'}];
      Object.entries(versions).forEach(([platform, version], index) => {
        if (index) node.children.push({type: 'text', value: ' · '});
        node.children.push({type: 'text', value: `${PLATFORM_LABELS[platform]} V${version}`});
        const beta = betas.includes(platform);
        node.children.push({
          type: 'mdxJsxTextElement', name: 'sup',
          attributes: [{type: 'mdxJsxAttribute', name: 'className',
            value: beta ? 'changelog-kind changelog-kind-beta' : 'changelog-kind'}],
          children: [{type: 'text', value: beta ? 'Beta' : '正式版'}],
        });
      });
    }
  };
}
