I want to redesign the product modal in my React fashion ecommerce project.

The modal currently works, but the UI isn't attractive and doesn't feel like premium fashion ecommerce.

Please refactor the modal according to the following requirements:

# Overall UI

* Design in a modern fashion-ecommerce style.
* UI must be clean, premium, minimalist, and have a clear visual hierarchy.
* Use consistent spacing based on an 8px system.
* Modal should have large rounded corners, a soft shadow, and a white or very light background.
* Desktop layout: two columns:
  * left: image gallery
  * right: product information
* Must be responsive and work well on mobile.

# Typography

* Use a modern font such as Inter or Poppins.
* Product title:
  * larger
  * font-weight 600 or 700
  * easy to read
* Product price must stand out:
  * darker color
  * larger font
  * high visual priority after the product image.
* Secondary text should use a muted color but maintain sufficient contrast.

# Product Info

Reorganize content into clearly grouped sections:

1. Product Info
   * title
   * price
   * short description

2. Product Variants
   * size selector
   * color selector

3. CTA
   * add to cart
   * buy now (if applicable)

4. Additional Info
   * delivery
   * return policy
   * stock

# Variant Selector

* The size selector must be more modern.
* Use buttons instead of a select element.
* Provide hover state.
* Provide clear active/selected state.
* Out-of-stock sizes must be clearly disabled.

# CTA Buttons

* The Add to Cart button must be the primary visual focus.
* Buttons should have:
  * subtle hover animation
  * good contrasting color
  * rounded corners
  * generous padding
* Avoid using colors that are too pale which make the button look disabled.

# Product Gallery

* Large main product image on the left.
* Thumbnails below.
* Active thumbnail should have a highlighted border.
* Hovering a thumbnail changes the main image.

# Zoom Effect

When hovering over the main image:
* image should slightly zoom toward the cursor position.
* smooth transition.
* transform-origin should change according to cursor position.
* avoid external libraries unless necessary.
* UX should resemble modern fashion ecommerce sites.

Implementation requirements:

* React
* SCSS
* Framer Motion if needed for animations
* clean code
* maintainable components
* subtle animations, not over-designed

# Accessibility

* ESC to close the modal
* clicking the overlay closes the modal
* focus trap
* `aria-modal`
* keyboard navigation

# Important

Current UI problems:
* weak typography
* CTA not prominent
* inconsistent spacing
* unclear hierarchy
* colors are washed out
* images and content are unbalanced
* modal doesn't look premium

Redesign the entire UI to be production-ready and look like a fashion ecommerce site.
