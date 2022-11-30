<h1 style="text-align: left">Table of Contents</h1>
- [Symbols](#symbols)
- [Rules](#rules)
- [Video Tutorials](#tutorials)

<!-- http://demo.showdownjs.com/#!#multiple-lines -->
<!-- https://github.com/showdownjs/showdown -->

<a id="symbols"></a>
<h1 style="text-align: left">Symbols</h1>
<div id="background-rules">
    <div>Symbol Rule</div>
      <div>&nbsp; F &nbsp;&nbsp; Move forward by line length drawing a line
        </div>
        <div>&nbsp; G &nbsp;&nbsp; Move forward by line length drawing a
            line
        </div>
        <div>&nbsp; f &nbsp;&nbsp; Move forward by line length without
            drawing a line
        </div>
        <div>&nbsp; + &nbsp;&nbsp; Turn left by turning angle</div>
        <div>&nbsp; - &nbsp;&nbsp; Turn right by turning angle</div>
        <div>&nbsp; | &nbsp;&nbsp; Reverse direction (ie: turn by 180
            degrees)
        </div>
        <div>&nbsp; [ &nbsp;&nbsp; Push current drawing state onto stack
        </div>
        <div>&nbsp; ] &nbsp;&nbsp; Pop current drawing state from the
            stack
        </div>
        <div>&nbsp; @ &nbsp;&nbsp; Draw a dot with line width radius</div>
        <div>&nbsp; &gt;  &nbsp;&nbsp; Multiply the line length by the line
            length scale factor
        </div>
        <div>&nbsp; &lt;  &nbsp;&nbsp; Divide the line length by the line
            length scale factor
        </div>
        <div>&nbsp; &amp; &nbsp;&nbsp; Swap the meaning of + and -</div>
        <div>&nbsp; ( &nbsp;&nbsp; Decrement turning angle by turning angle
            increment
        </div>
        <div>&nbsp; ) &nbsp;&nbsp; Increment turning angle by turning angle
            increment
    </div>
</div>

<a id="rules"></a>
<h1 style="text-align: left">Rules</h1>

<h2>Step-by-Step Guide to build an L-System</h2>
<h3>The Basics</h3>
<div><p>The starting point for Sanity is (0,0) on a 2D Cartesian plane. For example (0,0) -> (10,0).
This means the line length is the distance from origin to the point specified.<br> This gives you total control of starting positions.</p>
<img style="display: block" src="/assets/manual/coordinates.gif">
</div>

<h3>Line Control</h3>
<div><p>Adjust the starting x and y position by using the "Line Control" values shown below. <br>Iterations controls how many expansions to do.</p>
<img style="display: block" src="/assets/manual/xystartingpoint.png">
</div>

<h3>What the rules and symbols do</h3>
<div><p>Rules denote a specific action for the line generator to take. By chaining various rules together, an image can be formed.<br>
Note that any other ASCII characters is not accepted unless it is listed in the rules.
<br> The axiom is your starting condition.</p>
<br>
<img style="display: block" src="/assets/manual/rules.png">
</div>

<h3>Removing and Adding rules</h3>
<div><p>By clicking the Plus or Minus buttons rules can be added or subtracted from the L-System. By adding more rules, more complex designs can be created.</p>
<img style="display: block" src="/assets/manual/addremove.png">
</div>

<h3>Changing the Angle</h3>
<div><p>By changing the number from 0 to 360, the angle at which the line is drawn will be rotated accordingly.</p>
<img style="display: block" src="/assets/manual/angle.png">
</div>

<a id="tutorials"></a>
<h1 style="text-align: left">Video Tutorials</h1>

<h3>Understanding L-Systems</h3>
<iframe width="520" height="415"
src="https://www.youtube.com/embed/feNVBEPXAcE" frameborder="0" allowfullscreen>
</iframe>
<h3>Programming an L-System and Understanding Rulesets</h3>
<iframe width="520" height="415"
src="https://www.youtube.com/embed/f6ra024-ASY" frameborder="0" allowfullscreen>
</iframe>
<h3>Importing SVG to Adobe Illustrator</h3>
<iframe width="520" height="415"
src="https://www.youtube.com/embed/M3xmno_rIsQ" frameborder="0" allowfullscreen>
</iframe>



