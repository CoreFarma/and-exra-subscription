
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
    return res.status(404).send("グループが見つかりません");
  }

  // ダミー段階割引（1〜5ヶ月目想定）
  const discounts = [1000, 2000, 3000, 4000, 5000];
  const response = {
    groupId,
    region: group.region,
    shipping: group.shipping,
    shipDate: group.shipDate,
    discounts
  };
  res.json(response);
});

module.exports = app;
