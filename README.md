# ASHEN HOLLOW — currency icons

Seven PNGs, 128x128, transparent, palette-reduced. 5.3–9.7 KB each, ~59 KB total.

| file | currency | effect |
|---|---|---|
| `cu_exalt.png` | Exalted Orb | adds one random affix |
| `cu_annul.png` | Orb of Annulment | removes one random affix |
| `cu_qual.png` | Quality Orb | +5% quality, max 20% |
| `cu_socket.png` | Socket Orb | adds a socket |
| `cu_corrupt.png` | Corruption Orb | 20% destroys it, final |
| `cu_grkey.png` | Greater Rift Key | opens a Greater Rift |
| `cu_vault.png` | Vaulted Coin | accepted by every merchant |

## What was done to the originals

1. **Trimmed to the alpha bounding box.** The generator left different margins on
   each, so they would have rendered at visibly different sizes in the same cell.
2. **Padded back to square**, so the square stash cell never distorts them.
3. **Normalised by opaque coverage, not by bounding box.** Fitting each to the box
   left the round ones at 53–71% coverage and the slender ones at 20–26% — the key
   and the shard looked half the size of the orbs. The bulky ones are scaled to
   0.85 so the spread is now 20–51%. A key is legitimately slender; the point was
   to stop the orbs dominating it.
4. **Resized to 128 and palette-reduced to 256 colours.** They render at 46 px, so
   128 gives ~2.8x headroom for retina and zoom.

Transparency was already correct in the uploads (alpha min 0 on all seven) — no
background removal was needed or done.

## Uploading

Put these in your Characters repo, e.g.

    ashen-hollow-models/ui/currency/cu_exalt.png

Then set the base once in the game (see `currency-art-snippet.js`):

    window.CURRENCY_ART_BASE =
      'https://raw.githubusercontent.com/Graphic37/Characters/main/ashen-hollow-models/ui/currency/';

The filenames are the currency ids, so nothing needs a per-item mapping.

## One thing to fix before these go live

`cu_grkey` has an icon here but **no entry in the `CURRENCY` table** that
`makeCurrency()` reads. Verified at runtime: `makeCurrency('cu_grkey')` returns a
**Corruption Orb**, because it falls through to a random pick. Every other id
returns itself.

That is why the rift-completion award builds a Vaulted Coin and overwrites its
`baseId` and `name` by hand. The icon will still display, but the underlying
definition is missing and anything creating a key the normal way produces the
wrong item.
