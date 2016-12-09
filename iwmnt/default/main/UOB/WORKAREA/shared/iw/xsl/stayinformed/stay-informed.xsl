<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="stay-informed">

		<div class="container">		
			<xsl:apply-templates select="/Properties/Data/Datum/DCR/root"/>
		</div>
		
		<script>
			<xsl:attribute name="src">									
				<xsl:value-of select="/Properties/Data/Datum[@ID='jspath']"/>
			</xsl:attribute>
		</script>
</xsl:template>

		<xsl:template match="root">		
			<xsl:if test="stay_informed/non_tabbed_content">			
				<script type="text/javascript">
					<![CDATA[var path = "]]><xsl:value-of select="stay_informed/non_tabbed_content/csv_path"/><![CDATA[";
			]]>
			//alert(path);
				</script>		
			</xsl:if>

			<xsl:if test="stay_informed/tabbed_content">			
				<xsl:variable name="count" >
					<xsl:value-of select="count(stay_informed/tabbed_content/items)"/>
				</xsl:variable>
				<script type="text/javascript">
					<![CDATA[var path = ]]><xsl:text>[</xsl:text>
					<xsl:for-each select="stay_informed/tabbed_content/items">
					<xsl:text>['</xsl:text>
					<xsl:value-of select="tab_name"/>
					<xsl:text>','</xsl:text>
					<xsl:value-of select="csv_path"/>
					<xsl:text>']</xsl:text>
					<xsl:if test="position() != last()"><xsl:text>,</xsl:text></xsl:if>
					</xsl:for-each>
					<xsl:text>]</xsl:text><![CDATA[;]]>
					//document.getElementsByTagName('div')[0].innerHTML = path;
					//alert(path);
				</script>		
			</xsl:if>

		</xsl:template>
	</xsl:stylesheet>