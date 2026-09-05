# Academic Homepage Template

这是以 [jackfromeast/jackfromeast.github.io](https://github.com/jackfromeast/jackfromeast.github.io) 为直接视觉模板制作的静态版本：相同的窄栏学术主页布局、左侧固定目录、表格式 About/News，以及 Research、Publications、Talks、Awards、Services、Experiences 等版块。

## 本地预览

```bash
npm test
npm run dev
```

访问 `http://localhost:8080`。

## 修改内容

在 `index.html` 中搜索以下占位符：

- `Your Name`、`你的名字`
- `YOUR_USERNAME`
- `you@example.com`
- `某某大学`、`导师姓名`
- 示例论文、报告、奖项和经历

将个人照片保存为 `images/profile.jpg`，随后用下面的标签替换 `.photo-placeholder`：

```html
<img class="profile-photo" src="images/profile.jpg" alt="Your Name">
```

将简历保存为 `assets/cv.pdf`，并把简历链接改成 `assets/cv.pdf`。

## GitHub Pages

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

仓库 Settings → Pages → Source 选择 **GitHub Actions**。当前 `.github/workflows/pages.yml` 已配置静态部署。

## Attribution

Template adapted from `jackfromeast.github.io`; its upstream repository retains the MIT license and credits Jon Barron's academic website design.
