<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Hotel photo galleries use Embla inside an accessible full-viewport Radix dialog; this provides reliable touch gestures, keyboard navigation, and focus restoration without custom gesture parsing.
- Store a caption alongside each hotel photo URL so thumbnails, alternative text, and full-screen captions remain consistent.
- Keep the Super Turquia offer in a shared browser-safe data module used by the price display and business-rule tests, so payment conditions stay consistent.
- Derive itinerary cards and the complete itinerary dialog from one itinerary data source, so the displayed days cannot diverge.
