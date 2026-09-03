# MORGUNMVON Pinterest Content Studio — V1

这是一个可以直接在浏览器中运行的基础网页原型。它帮助你先填写产品与场景信息，再生成一份 Pinterest 内容示例，方便理解未来接入 AI 后的完整工作流程。

> V1 不会连接 OpenAI、Pinterest、数据库或任何第三方服务，也不会上传或保存你填写的内容。刷新或关闭页面后，填写内容就会消失。

## 1. 这个项目有哪些文件？

项目只有 4 个主要文件，彼此分工明确：

```text
Morgunmvon-pinterest/
├── index.html    网页的内容和结构
├── styles.css    网页的视觉样式
├── script.js     按钮和示例内容生成逻辑
└── README.md     你正在阅读的使用说明
```

### `index.html`

相当于网页的“骨架”。页面标题、说明文字、所有输入字段、按钮和结果区域都在这里。

### `styles.css`

相当于网页的“视觉设计”。颜色、字体、字号、留白、分栏、按钮样式和移动端布局都在这里。

### `script.js`

相当于网页里很小的“工作逻辑”。它会在你点击 **Generate Content** 时读取输入内容，并把预先写好的示例句式与输入内容组合起来，再显示到 Pinterest Content 区域。

### `README.md`

项目说明文件，只用于阅读，不会影响网页的显示或运行。

## 2. 网页如何工作？

1. 在 **Product Information** 填写产品资料。
2. 在 **Scene Planning** 填写目标人群和希望呈现的场景。
3. 点击 **Generate Content**。
4. 浏览器先检查必填项；如果有遗漏，会提示你完成该字段。
5. 全部填写后，页面会在 **Pinterest Content** 中生成 Title、Description、Keywords 和 Image Prompt 的示例。

这里的“生成”只是浏览器按照 `script.js` 中的固定句式进行文字拼接，不是真正的 AI 生成，也不会把任何资料发送到互联网。

## 3. 以后如何修改？

建议修改前先复制一份整个项目文件夹作为备份。代码编辑器可以使用 Visual Studio Code，普通文本编辑器也可以。

### 修改页面文字

打开 `index.html`，找到想改的英文文字并直接替换。例如：

- 页面大标题：搜索 `Build a considered product story.`
- 区域名称：搜索 `Product Information`、`Scene Planning` 或 `Pinterest Content`
- 按钮文字：搜索 `Generate Content`
- 输入提示：搜索以 `e.g.` 开始的文字

请只修改 `<` 和 `>` 之间能够看懂的文字，不要随意删除尖括号中的标签。

### 修改视觉

打开 `styles.css`：

- 页面主要颜色在文件最上方的 `:root` 区域。
- `--paper` 是背景色。
- `--ink` 是主要文字色。
- `--muted` 是次要文字色。
- `--accent` 是小标题与序号的强调色。
- 搜索 `font-family` 可以修改字体。
- 搜索 `font-size` 可以修改字号。
- 搜索 `padding` 或 `gap` 可以修改留白和元素间距。

颜色使用类似 `#f3f1ec` 的色号。修改一个色号并保存，再刷新浏览器即可看到效果。

### 增加或删除产品字段

产品字段在 `index.html` 的 **Product Information** 区域中。每个字段大致长这样：

```html
<label>
  <span>Product Type</span>
  <input name="productType" type="text" placeholder="e.g. Side table" required />
</label>
```

- 想删除字段：删除对应的完整 `<label> ... </label>`。
- 想增加字段：复制一整段，再修改显示名称、`name` 和提示文字。
- `required` 表示必填；删除这个词后，该字段会变成选填。

如果希望新字段也出现在生成结果中，还需要在 `script.js` 里把它加入示例句式。`name="productType"` 会在脚本中对应 `data.productType`。两边名称必须保持一致。

### 修改生成的示例文字

打开 `script.js`，找到：

- `outputs.title`：标题句式
- `outputs.description`：描述句式
- `outputs.keywords`：关键词列表
- `outputs.prompt`：图片提示词句式

反引号中的 `${data.productName}` 等内容会自动替换为表单里填写的资料。普通英文则可以直接修改。

## 4. 如何预览网页？

### 最简单的方法

1. 打开项目文件夹。
2. 双击 `index.html`。
3. 文件会在默认浏览器中打开。
4. 修改文件并保存后，回到浏览器刷新页面即可看到变化。

这个方法不需要安装软件，也不需要联网。

### 使用本地预览服务器（可选）

如果电脑已经安装 Python，可以在终端进入项目文件夹并运行：

```bash
python3 -m http.server 8000
```

然后在浏览器打开：

```text
http://localhost:8000
```

结束预览时，在终端按 `Control + C`。

## 5. V1 的范围

目前只包含：

- 产品信息表单
- 场景规划表单
- 必填项检查
- 示例 Pinterest 内容生成
- 桌面端与移动端响应式布局

目前不包含账号、资料保存、图片上传、AI 生成、Pinterest 发布或任何外部服务。这样可以让第一个版本保持简单、清晰并容易维护。
