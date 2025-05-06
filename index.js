
const express = require("express");
const app = express();

const groups = {
  g1: { region: "本州", shipping: 1100, shipDate: 5 },
  g2: { region: "北海道・沖縄", shipping: 3300, shipDate: 5 },
  g3: { region: "本州", shipping: 1100, shipDate: 15 },
  g4: { region: "北海道・沖縄", shipping: 3300, shipDate: 15 },
  g5: { region: "本州", shipping: 1100, shipDate: 25 },
  g6: { region: "北海道・沖縄", shipping: 3300, shipDate: 25 }
};

app.get("/start-subscription/:groupId", (req, res) => {
  const { groupId } = req.params;
  const group = groups[groupId];
  if (!group) {
    return res.status(404).send("<h1>エラー: グループが見つかりません</h1>");
  }

  const discounts = [1000, 2000, 3000, 4000, 5000];

  res.send(`
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>定期購入確認</title>
        <style>
          body { font-family: sans-serif; padding: 2em; line-height: 1.8; }
          h1 { color: #333366; }
          .box { background: #f0f0f0; padding: 1.5em; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h1>定期購入情報（${groupId}）</h1>
        <div class="box">
          <p><strong>対象地域:</strong> ${group.region}</p>
          <p><strong>送料:</strong> ¥${group.shipping.toLocaleString()}</p>
          <p><strong>発送日:</strong> 毎月${group.shipDate}日</p>
          <p><strong>段階割引:</strong></p>
          <ul>
            ${discounts.map((amt, i) => `<li>${i + 1}ヶ月目: ¥${amt.toLocaleString()} 割引</li>`).join("")}
          </ul>
        </div>
      </body>
    </html>
  `);
});

module.exports = app;
