/*
 * SonarQube, open source software quality management tool.
 * Copyright (C) 2008-2014 SonarSource
 * mailto:contact AT sonarsource DOT com
 *
 * SonarQube is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * SonarQube is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
package org.sonar.core.qualitygate.db;

import org.junit.Test;
import org.sonar.api.measures.Metric.ValueType;

import static org.fest.assertions.Assertions.assertThat;
import static org.sonar.api.measures.Metric.ValueType.*;
import static org.sonar.core.qualitygate.db.QualityGateConditionDto.isOperatorAllowed;

public class QualityGateConditionDtoTest {

  @Test
  public void should_validate_operators_for_metric_type() {
    assertThat(isOperatorAllowed("WHATEVER", null)).isFalse();
    assertThat(isOperatorAllowed("WHATEVER", DATA)).isFalse();

    assertThat(isOperatorAllowed("EQ", BOOL)).isTrue();
    assertThat(isOperatorAllowed("NE", BOOL)).isFalse();
    assertThat(isOperatorAllowed("LT", BOOL)).isFalse();
    assertThat(isOperatorAllowed("GT", BOOL)).isFalse();

    assertThat(isOperatorAllowed("EQ", LEVEL)).isTrue();
    assertThat(isOperatorAllowed("NE", LEVEL)).isTrue();
    assertThat(isOperatorAllowed("LT", LEVEL)).isFalse();
    assertThat(isOperatorAllowed("GT", LEVEL)).isFalse();

    for (ValueType type: new ValueType[] { STRING, INT, FLOAT, PERCENT, MILLISEC, RATING }) {
      assertThat(isOperatorAllowed("EQ", type)).isTrue();
      assertThat(isOperatorAllowed("NE", type)).isTrue();
      assertThat(isOperatorAllowed("LT", type)).isTrue();
      assertThat(isOperatorAllowed("GT", type)).isTrue();
    }
  }
}
