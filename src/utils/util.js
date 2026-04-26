// 将扁平数据转换为树形结构
// dataArray 是一个包含所有节点的数组，每个节点包含 id、pid、name 等属性
export function convertToATreeData(dataArray) {
  const nodesMap = {}; // 用于快速查找节点的映射表
  const treeData = []; // 最终生成的树形数据

  // 第一次遍历：创建所有节点的副本并存入映射表
  dataArray.forEach((item) => {
    nodesMap[item.id] = {
      key: item.id,
      title: item.name,
      code: item.code,
      typ: item.typ,
      disabled: item.pid === "0", // 如果是根节点，则禁用
      children: [], // 初始化子节点数组
    };
  });

  // 第二次遍历：建立父子关系
  dataArray.forEach((item) => {
    const currentNode = nodesMap[item.id];
    const parentId = item.pid;

    if (parentId === "0") {
      // 根节点直接加入树数据
      treeData.push(currentNode);
    } else {
      // 找到父节点并加入其children数组
      const parentNode = nodesMap[parentId];
      if (parentNode) {
        parentNode.children.push(currentNode);
      }
    }
  });

  return treeData;
}

// 查找第一个 typ 为 2 的叶子节点，并返回其父节点 ,如果是想查找第一个 typ 为 2 且指定key值时，则传入key值
export function findFirstLeafNode(treeData, key = null, parent = null) {
  console.log("查找第一个叶子节点", treeData, key, parent);
  // eslint-disable-next-line no-restricted-syntax
  for (let node of treeData) {
    if (node.children && node.children.length) {
      // 如果有子节点，递归查找
      const { leafNode, parentNode } = findFirstLeafNode(
        node.children,
        key,
        node
      );
      if (leafNode) {
        return { leafNode, parentNode };
      }
    } else {
      // 如果没有子节点，检查 typ 是否为 2  ba_pump301 pump-255   // node.typ === '2' && node.key === 'ba_distribution2'
      // eslint-disable-next-line

      if (key && node.typ === "2" && node.key === key) {
        return { leafNode: node, parentNode: parent };
      }
      if (node.typ === "2" && !key) {
        // 如果没有指定 key，则返回第一个找到的叶子节点
        return { leafNode: node, parentNode: parent };
      }
    }
  }
  return { leafNode: null, parentNode: null }; // 如果没有找到符合条件的叶子节点，返回null
}
