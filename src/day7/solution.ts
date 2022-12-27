const oneHundredThousand = 100000;
export enum FileSystemNodeType {
  file,
  directory,
}
export interface FileSystemNode {
  name: string;
  type: FileSystemNodeType;
  parent?: FileSystemNode;
}

export class DirectoryFileSystemNode implements FileSystemNode {
  readonly type: FileSystemNodeType.directory;
  readonly name: string;
  private _fileChildren: Map<string, FileFileSystemNode>;
  private _directoryChildren: Map<string, DirectoryFileSystemNode>;
  constructor(name: string, public readonly parent?: DirectoryFileSystemNode) {
    this.type = FileSystemNodeType.directory;
    this.name = name;
    this._fileChildren = new Map();
    this._directoryChildren = new Map();
  }
  addFileChildNode(node: FileFileSystemNode): void {
    if (this._fileChildren.has(node.name)) {
      console.log("Overwriting file", node.name, {
        old: this._fileChildren.get(node.name)?.size,
        new: node.size,
      });
    }
    this._fileChildren.set(node.name, node);
  }
  addDirectoryChildNode(node: DirectoryFileSystemNode): void {
    if (this._directoryChildren.has(node.name)) {
      console.log("Overwriting directory", node.name);
    }
    this._directoryChildren.set(node.name, node);
  }
  get fileChildren(): FileFileSystemNode[] {
    return Array.from(this._fileChildren.values());
  }
  get directoryChildren(): DirectoryFileSystemNode[] {
    return Array.from(this._directoryChildren.values());
  }
}
export class FileFileSystemNode implements FileSystemNode {
  readonly type: FileSystemNodeType.file;
  readonly name: string;
  readonly size: number;
  constructor(
    name: string,
    size: number,
    public readonly parent: DirectoryFileSystemNode
  ) {
    this.type = FileSystemNodeType.file;
    this.name = name;
    this.size = size;
  }
}

export function readToTree(outputLines: string[]): DirectoryFileSystemNode {
  const root = new DirectoryFileSystemNode("/");
  let current: DirectoryFileSystemNode = root;
  for (let command of outputLines) {
    // console.log(command);
    if (command === "$ cd /") {
      current = root;
      continue;
    }
    if (/^\d* .*/.test(command)) {
      const [sizeString, fileName] = command.split(" ");
      current.addFileChildNode(
        new FileFileSystemNode(fileName, Number(sizeString), current)
      );
      continue;
    }
    if (/^\$ cd [a-z].?[a-z]*$/.test(command)) {
      const [_$, _cd, dirName] = command.split(" ");

      const dirNode = new DirectoryFileSystemNode(dirName, current);
      current.addDirectoryChildNode(dirNode);
      current = dirNode;
      continue;
    }
    if (/^\$ cd \.\.$/.test(command)) {
      current = current.parent!;
      continue;
    }
  }
  return root;
}

export function sumForDirectory(
  root: DirectoryFileSystemNode,
  prefix: string
): {
  name: string;
  size: number;
}[] {
  const name = `${prefix}/${root.name === "/" ? "root" : root.name}`;
  const childrenSizes = root.directoryChildren.flatMap((node) =>
    sumForDirectory(node, name)
  );
  return [
    {
      name: name,
      size:
        root.fileChildren.reduce((total, node) => total + node.size, 0) +
        childrenSizes.reduce((t, c) => t + c.size, 0),
    },
    ...childrenSizes,
  ];
}

export function part1(input: string): number {
  const root = readToTree(input.split("\n"));
  // console.log(visualize(root, "").join("\n"));
  const sums = sumForDirectory(root, "");
  sums.map((n) => `${n.name} : ${n.size}`).forEach((line) => console.log(line));
  const lessThanOneHundredThousand = sums.filter(
    (x) => x.size <= oneHundredThousand
  );
  console.log("-----------------------------------------------");
  console.log("-----------------------------------------------");
  console.log("------  lessThanOneHundredThousand   ----------");
  console.log("-----------------------------------------------");
  console.log("-----------------------------------------------");
  console.log(
    lessThanOneHundredThousand.map((x) => `${x.name}:${x.size}`).join("\n")
  );
  let answer = lessThanOneHundredThousand.reduce((t, c) => c.size + t, 0);
  if (answer === 1630322) {
    console.error("1630322 is Wrong");
    return -1;
  }
  return answer;
}

export function part2(input: string): number {
  return 0;
}
