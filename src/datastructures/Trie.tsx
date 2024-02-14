class TrieNode {
    value: string;
    children: Map<string, TrieNode>;
    isEnd: boolean;
    constructor(value: string = "") {
        this.children = new Map();
        this.isEnd = false;
        this.value = value;
    }
}

class Trie {
    root: TrieNode;

    constructor(words: string[] = []) {
        this.root = new TrieNode();

        if (arguments.length) {
            words.forEach((word) => {
                this.insert(word);
            });
        }
    }

    insert(word: string) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode(char));
            }

            node = node.children.get(char)!;
        }
        node.isEnd = true;
    }

    complete(word: string) {
        let node = this.root;
        let completions: string[] = [];
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node.children.has(char)) {
                return completions;
            }
            node = node.children.get(char)!;
        }
        this._findCompletions(node, word, completions);
        return completions;
    }

    _findCompletions(node: TrieNode, word: string, completions: string[]) {
        if (node.isEnd) {
            completions.push(word);
        }
        for (let [char, childNode] of node.children) {
            this._findCompletions(childNode, word + char, completions);
        }
    }
}

export default Trie;
