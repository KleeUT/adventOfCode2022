import { describe, expect, it, test } from "vitest";
import {
  DirectoryFileSystemNode,
  FileFileSystemNode,
  part1,
  readToTree,
  sumForDirectory,
} from "./solution";
describe("day template", () => {
  it("should read lines to file system", () => {
    const outputLines = ["$ cd /"];
    expect(readToTree(outputLines)).toEqual(new DirectoryFileSystemNode("/"));
  });
  it("should read lines to file system one level", () => {
    const outputLines = ["$ cd /", "$ ls", "14848514 b.txt"];
    const root = new DirectoryFileSystemNode("/");
    root.addFileChildNode(new FileFileSystemNode("b.txt", 14848514, root));
    expect(readToTree(outputLines)).toEqual(root);
  });
  it("should read lines to file system with directory", () => {
    const outputLines = [
      "$ cd /",
      "$ ls",
      "dir a",
      "$ cd a",
      "$ ls",
      "14848514 b.txt",
    ];
    const root = new DirectoryFileSystemNode("/");
    const a = new DirectoryFileSystemNode("a", root);
    root.addDirectoryChildNode(a);
    a.addFileChildNode(new FileFileSystemNode("b.txt", 14848514, a));
    expect(readToTree(outputLines)).toEqual(root);
  });

  it("should read lines to file system with multiple directories", () => {
    const outputLines = [
      "$ cd /",
      "$ ls",
      "dir a",
      "dir b",
      "$ cd a",
      "$ ls",
      "14848514 c.txt",
      "$ cd ..",
      "$ cd b",
      "14848514 d",
    ];
    const root = new DirectoryFileSystemNode("/");
    const a = new DirectoryFileSystemNode("a", root);
    root.addDirectoryChildNode(a);
    a.addFileChildNode(new FileFileSystemNode("c.txt", 14848514, a));
    const b = new DirectoryFileSystemNode("b", root);
    root.addDirectoryChildNode(b);
    b.addFileChildNode(new FileFileSystemNode("d", 14848514, b));
    expect(readToTree(outputLines)).toEqual(root);
  });
  it("should read lines to file system with multiple directories and mixed content", () => {
    const outputLines = [
      "$ cd /",
      "$ ls",
      "1234 z.json",
      "dir a",
      "dir b",
      "$ cd a",
      "$ ls",
      "14848514 c.txt",
      "$ cd ..",
      "$ cd b",
      "14848514 d",
    ];
    const root = new DirectoryFileSystemNode("/");
    root.addFileChildNode(new FileFileSystemNode("z.json", 1234, root));
    const a = new DirectoryFileSystemNode("a", root);
    root.addDirectoryChildNode(a);
    a.addFileChildNode(new FileFileSystemNode("c.txt", 14848514, a));
    const b = new DirectoryFileSystemNode("b", root);
    root.addDirectoryChildNode(b);
    b.addFileChildNode(new FileFileSystemNode("d", 14848514, b));
    expect(readToTree(outputLines)).toEqual(root);
  });
  describe("sum size by directory", () => {
    it("simple directory", () => {
      const root = new DirectoryFileSystemNode("/");
      root.addFileChildNode(new FileFileSystemNode("d", 84, root));

      expect(sumForDirectory(root, "")).toEqual([{ name: "/root", size: 84 }]);
    });
    it("nested directory", () => {
      const root = new DirectoryFileSystemNode("/");
      root.addFileChildNode(new FileFileSystemNode("a", 84, root));
      const b = new DirectoryFileSystemNode("b", root);
      root.addDirectoryChildNode(b);
      b.addFileChildNode(new FileFileSystemNode("c", 1900, root));

      expect(sumForDirectory(root, "")).toEqual([
        { name: "/root", size: 1984 },
        { name: "/root/b", size: 1900 },
      ]);
    });
  });
  describe("part 1", () => {
    test("counts child directory and parent direcctory", () => {
      const outputLines = [
        "$ cd /",
        "$ ls",
        "dir a",
        "200 b.txt",
        "$ cd a",
        "$ ls",
        "10000 c.txt",
      ];

      expect(part1(outputLines.join("\n"))).toEqual(20200);
    });
    test("if there is a big child ignore it all", () => {
      const outputLines = [
        "$ cd /",
        "$ ls",
        "dir a",
        "200 b.txt",
        "$ cd a",
        "$ ls",
        "110000 c.txt",
      ];

      expect(part1(outputLines.join("\n"))).toEqual(0);
    });
    test("if there is a big child ignore it all", () => {
      const outputLines = [
        "$ cd /",
        "$ ls",
        "dir a",
        "200000 b.txt",
        "$ cd a",
        "$ ls",
        "10000 c.txt",
      ];

      expect(part1(outputLines.join("\n"))).toEqual(10000);
    });
    test("if there is a big child ignore it all", () => {
      const outputLines = [
        "$ cd /",
        "$ ls",
        "dir a",
        "dir d",
        "200 b.txt",
        "$ cd a",
        "$ ls",
        "10000 c.txt",
        "$ cd ..",
        "$ cd d",
        "$ ls",
        "100001 c.txt",
      ];

      expect(part1(outputLines.join("\n"))).toEqual(10000);
    });
  });
});
