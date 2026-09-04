# MORGUNMVON Pinterest Content Studio — V2A

这是一个可直接在浏览器运行的内容规划网页。V2A 新增 **Product Library（产品资料库）**：先从资料库选择系列和产品，页面便会自动带出产品资料，不再需要逐项手工填写。Scene Planning、Generate Content 和 Pinterest Content 的原有流程保持不变。

> V2A 不连接 OpenAI、Pinterest、数据库或任何第三方服务，也不包含图片生成和发布功能。所有内容都在当前浏览器内处理，不会上传或保存表单内容。

## 1. Product Library 是什么？

Product Library 是产品的统一资料清单。每个产品只需在清单中维护一次，使用网页时即可反复选择。选择 **Collection** 后，**Product** 只会列出该系列中的产品；选择 Product 后，页面会自动展示：

- Product ID
- Product Type
- Style
- Name
- Number
- Primary Color
- Secondary Color
- Customization Type
- Product Preview

这些资料是只读展示，不需要使用者重复输入。点击 **Generate Content** 时，原有的示例文案逻辑也会使用当前选中产品的资料。

## 2. 项目文件

```text
Morgunmvon-pinterest/
├── index.html     网页结构、选择项和结果区域
├── styles.css     Premium / Editorial 视觉及响应式布局
├── products.js    Product Library 产品资料（主要维护此文件）
├── script.js      产品筛选、资料展示和示例文案逻辑
└── README.md      使用与维护说明
```

### 为什么产品资料使用 `products.js`，而不是 CSV？

CSV 本身容易编辑，但这个项目是纯静态网页，并支持直接双击 `index.html` 离线打开。浏览器出于安全限制，通常不允许这种页面直接读取旁边的 CSV；若使用 CSV，就必须要求使用者启动本地服务器，或加入额外的读取工具，会明显增加维护和使用复杂度。

因此 V2A 使用独立的 `products.js` 简单清单。它仍然是普通文本文件，可用记事本或 Visual Studio Code 编辑；网页也可以继续双击打开，不需要安装程序。请按照下面的复制、修改方式维护，不需要编程。

## 3. 如何维护产品资料？

修改前，建议先复制一份 `products.js` 作为备份。用普通文本编辑器打开 `products.js`，会看到每个产品都是一段由 `{` 开始、由 `},` 结束的资料：

```js
{
  productId: "Philadelphia-13",
  collection: "Philadelphia",
  productType: "Decorative panel",
  style: "Architectural minimalism",
  name: "Philadelphia",
  number: "13",
  primaryColor: "Warm ivory",
  secondaryColor: "Graphite",
  customizationType: "Color and size",
  productImage: "",
},
```

### 增加一个产品

1. 完整复制一个现有产品，从 `{` 到 `},`，包括最后的英文逗号。
2. 将复制内容粘贴在最后一个产品的 `},` 后、文件最末尾的 `];` 前。
3. 修改双引号内的文字，保留字段名、冒号、双引号和逗号。
4. `productId` 必须是唯一的，不可与其他产品重复。
5. `collection` 拼写完全相同的产品会自动归入同一个 Collection。
6. 保存文件并刷新网页，新产品就会出现在对应系列中。

### 删除一个产品

找到该产品完整的 `{ ... },` 区块并删除。不要删除文件开头的 `const PRODUCT_LIBRARY = [` 或末尾的 `];`。保存并刷新网页即可。

### 修改产品信息

找到对应的 `productId`，只修改目标字段双引号中的内容。例如把：

```js
primaryColor: "Warm ivory",
```

改成：

```js
primaryColor: "Soft white",
```

请使用英文半角双引号 `"` 和英文逗号 `,`。如果文字本身需要双引号，建议改用其他表达方式，以免破坏资料格式。

### Product Image 以后如何添加？

目前 4 个测试产品的 `productImage` 都是空白，因此页面显示简洁的内置 Placeholder，不会调用任何外部图片。

以后可在项目中新建 `images` 文件夹，将图片复制进去，并在相应产品填写相对路径。例如图片文件是 `images/philadelphia-13.jpg`：

```js
productImage: "images/philadelphia-13.jpg",
```

建议：

- 使用 JPG、PNG 或 WebP 文件；
- 文件名使用英文小写字母、数字和连字符，不使用空格；
- 每个产品使用独立图片；
- 图片保存在项目内，不填写外部网站地址，避免链接失效和隐私风险；
- 路径和文件名（包括大小写）必须完全一致。

## 4. 网页如何使用？

1. 在 **Product Information** 选择 Collection。
2. 再选择 Product，确认自动显示的资料和 Product Preview。
3. 在 **Scene Planning** 填写 Target Audience 和 Scene。
4. 点击 **Generate Content**。
5. 在 **Pinterest Content** 查看 Title、Description、Keywords 和 Image Prompt 示例。

这里的“生成”只是 `script.js` 按固定句式组合产品与场景资料，不是真正的 AI 生成，也不会向互联网发送资料。

## 5. 如何预览？

最简单的方式是双击 `index.html`。修改文件并保存后，回到浏览器刷新页面。

如果电脑已安装 Python，也可以在项目文件夹运行：

```bash
python3 -m http.server 8000
```

再访问 `http://localhost:8000`。结束时在终端按 `Control + C`。

## 6. V2A 范围

目前包含 Product Library、产品筛选和只读资料展示、Product Preview 占位、场景规划、必填检查、示例 Pinterest 内容生成，以及桌面与移动端布局。

目前不包含 Scene Library、账号、数据库、资料在线保存、图片上传、图片生成、OpenAI API、Pinterest API 或发布功能。项目中不需要、也不应加入 API Key、密码、Token 或第三方账号信息。
