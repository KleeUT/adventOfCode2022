const oneHundredThousand = 100000;
const seventyMillion = 70000000;
const thirtyMillion = 30000000;

interface Node {
  name: string;
  size: number;
}

function readInDirectories(input: string): Node[] {
  const allNodes: Map<string, Node> = new Map();
  let currentNodes: string[] = [];
  const lines = input.split("\n");
  for (let line of lines) {
    if (line === "$ cd ..") {
      let [_, ...nodes] = currentNodes;
      currentNodes = nodes;
    } else if (line.startsWith("$ cd")) {
      const name = line.substring(5);
      const node: Node = {
        name: `${currentNodes[0] || ""}/${name === "/" ? "root" : name}`,
        size: 0,
      };
      currentNodes = [node.name, ...currentNodes];
      allNodes.set(node.name, node);
    } else if (/^\d* /.test(line)) {
      const size = Number(line.substring(0, line.indexOf(" ")));
      currentNodes.forEach((nodeName) => {
        const node = allNodes.get(nodeName);
        if (!node) {
          throw new Error(`Developer mistake ${nodeName} not in all nodes`);
        }
        node.size += size;
      });
    }
  }
  return Array.from(allNodes.values());
}

export function part1(input: string): number {
  const allNodes = readInDirectories(input);

  return allNodes
    .filter((x) => x.size <= oneHundredThousand)
    .reduce((total, node) => total + node.size, 0);
}

export function part2(input: string): number {
  const allNodes = readInDirectories(input);

  let sortedNodes = allNodes.sort((a, b) => b.size - a.size).map((x) => x.size);
  console.log(sortedNodes);
  const required = thirtyMillion - (seventyMillion - sortedNodes[0]);
  console.log({ required });
  const node = [...sortedNodes].reverse().find((x) => x >= required);
  return node!;
  // .filter((x) => x.size <= oneHundredThousand)
  // .reduce((total, node) => total + node.size, 0);
}
