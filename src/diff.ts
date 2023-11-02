import { render } from "./render";

const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffChildren = (oldVChildren, newVChildren) => {
  const childPatches = [];

  // same children nodes
  for (const [oldVChild, newVChild] of zip(oldVChildren, newVChildren)) {
    childPatches.push(diff(oldVChild, newVChild));
  }

  // additional nodes
  const additionalPatches = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push(($node) => {
      $node.appendChild(render(additionalVChild));
      return $node;
    });
  }

  return ($parent) => {
    for (const [patch, child] of zip(childPatches, $parent.childNodes)) {
      patch(child);
    }

    for (const patch of additionalPatches) {
      patch($parent);
    }

    return $parent;
  };
};

const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];

  // set atrributes
  patches.push(($node) => {
    if ($node.props) {
      if (JSON.stringify($node.props) !== JSON.stringify(newAttrs)) {
        $node.props = newAttrs;
        const newTree = $node.render();
        const patch = diff($node.__prevTree, newTree);
        patch($node.shadowRoot.firstElementChild);
      }
    } else {
      for (const [attr, val] of Object.entries(newAttrs || {})) {
        if (attr !== "click" && attr !== "keyup") {
          $node.setAttribute(attr, val);
        }
      }
    }
    return $node;
  });

  // if old attributes exist in new attributes, remove old attributes
  for (const attr in oldAttrs) {
    if (!(attr in newAttrs)) {
      patches.push(($node) => {
        $node.removeAttribute(attr);
        return $node;
      });
    }
  }

  return ($node) => {
    for (const patch of patches) {
      patch($node);
    }
  };
};

export const diff = (vOldNode, vNewNode) => {
  // remove old node when new virtual node does not exist
  if (typeof vNewNode === "undefined") {
    return ($node) => {
      $node.remove();
      return undefined;
    };
  }

  // if new node is a text node
  if (
    typeof vOldNode === "string" ||
    typeof vNewNode === "string" ||
    typeof vOldNode === "number" ||
    typeof vNewNode === "number"
  ) {
    if (vOldNode !== vNewNode) {
      return ($node) => {
        const $newNode = render(vNewNode);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      return ($node) => undefined; // doing nothing
    }
  }

  // if new node is an array
  if (Array.isArray(vOldNode) || Array.isArray(vNewNode)) {
    // const patchAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs);
    const patchChildren = diffChildren(vOldNode, vNewNode);

    return ($node) => {
      // patchAttrs($node);
      patchChildren($node);

      return $node;
    };
  }

  // if two node are different tags
  if (vOldNode.tagName !== vNewNode.tagName) {
    return ($node) => {
      // convert the new virtual dom node to real dom node
      const $newNode = render(vNewNode);
      // replace old node with new node
      $node.replaceWith($newNode);

      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs);
  const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

  return ($node) => {
    patchAttrs($node);
    patchChildren($node);

    return $node;
  };
};
